import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

interface returnedData {
  avgConvoStartTime?: string;
  avgPromptLen?: number;
  avgConvoLen?: number;
  envImpact?: number;
  Co2Impact?: number;
  error?: string;
}

export const POST = async (req: NextRequest) => {
  let testObj: returnedData = {
    avgConvoStartTime: "",
    avgPromptLen: 0,
    avgConvoLen: 0,
    error: "",
  };

  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as Blob) || null;

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
  } else {
    const err: returnedData = {
      error: "couldn't read file",
    };
    return NextResponse.json({
      success: false,
      body: err,
    });
  }

  let jsonBody = "";
  await file.text().then((txt) => {
    jsonBody = txt;
  });
  jsonBody = JSON.parse(jsonBody);
  testObj.avgConvoLen = getAvgConvLen(jsonBody);
  testObj.avgPromptLen = getAveragePromptLen(jsonBody);
  testObj.avgConvoStartTime = getAverageTimeStamp(jsonBody);
  testObj.envImpact = getWater(jsonBody)
  testObj.Co2Impact = getco2(jsonBody)
  return NextResponse.json({
    success: true,
    body: JSON.stringify(testObj),
  });
};

function getAvgConvLen(jsBody: any): number {
  let totalMsgs = 0;
  let count = 0;

  for (const convo of jsBody) {
    const messageNodes = Object.values(convo.mapping)
      .filter((m: any) => m?.message);
    totalMsgs += messageNodes.length;
    count++;
  }

  return count > 0 ? Math.floor(totalMsgs / count) : 0;

}

function getAveragePromptLen(jsBody: any): number {
  let sumPromptLen = 0;
  let count = 0;

  for (const convo of jsBody) {
    const userMessages = (Object.values(convo.mapping) as any[])
      .filter((m: any) => m?.message?.author?.role === "user");

    if (userMessages.length > 0) {
      const firstUserMsg = String(userMessages[0]?.message?.content?.parts?.[0] ?? "");
      sumPromptLen += firstUserMsg.length;
      count++;
    }
  }

  return count > 0 ? Math.round(sumPromptLen / count) : 0;
}


function getAverageTimeStamp(jsBody: any) {
  let unixTimeSum = 0;
  for (const msgs of jsBody) {
    let id = Object.keys(msgs.mapping)[2];
    let time = msgs.mapping[id].message.create_time;

    const date = new Date(time * 1000);
    date.setMonth(10);
    date.setDate(14);
    date.setFullYear(2008);
    unixTimeSum += date.getTime();
  }
  let averageTime = new Date(Math.floor(unixTimeSum / jsBody.length));

  return averageTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getWater(jsBody: any): number {
  let sumSpaces = 0;
  let count = 0;

  for (const convo of jsBody) {
    const assistantMessages = (Object.values(convo.mapping) as any[])
      .filter((m: any) => m?.message?.author?.role === "assistant");

    for (const msg of assistantMessages) {
      const assistantMsg = String(msg?.message?.content?.parts?.[0] ?? "");
      sumSpaces += assistantMsg.match(/ /g)?.length ?? 0;
      count++;
    }
  }

  return count > 0 ? sumSpaces / 50 : 0;
}
function getco2(jsBody: any): number {
  let sumPrompts = 0;

  for (const convo of jsBody) {
    const userMessages = (Object.values(convo.mapping) as any[])
      .filter((m: any) => m?.message?.author?.role === "user");
    sumPrompts += userMessages.length
   
  }

  return sumPrompts *4.32;
}

