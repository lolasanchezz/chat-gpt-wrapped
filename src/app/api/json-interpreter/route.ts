import { NextRequest, NextResponse } from "next/server";

interface returnedData {
  avgConvoStartTime?: string;
  avgPromptLen?: number;
  avgConvoLen?: number;
  
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

  let jsonBody = ""
  await file.text().then((txt) => { jsonBody = txt })
  jsonBody = JSON.parse(jsonBody)
  testObj.avgConvoLen = getAvgConvLen(jsonBody)
  testObj.avgPromptLen = getAveragePromptLen(jsonBody)
  testObj.avgConvoStartTime = getAverageTimeStamp(jsonBody)



  return NextResponse.json({
    success: true,
    body: JSON.stringify(testObj),
  });
};


function getAvgConvLen(jsBody: any): number {

  let convLen = 0
  for (const obj of jsBody) {
    let ids = Object.keys(obj.mapping).slice(2)
    
    convLen += ids.length
  }
  return Math.floor(convLen/jsBody.length)
}


function getAveragePromptLen(jsBody: any): number {
  let sumPromptLen = 0;
  for (const msgs of jsBody) {
    let relId = Object.keys(msgs.mapping)[2]
    sumPromptLen += msgs.mapping[relId].message.content.parts[0].length
  }
  return sumPromptLen/jsBody.length
}

function getAverageTimeStamp(jsBody: any) {
  let unixTimeSum = 0;
  for (const msgs of jsBody) {
    let id = Object.keys(msgs.mapping)[2]
    let time = msgs.mapping[id].message.create_time
    
    const date = new Date(time)
    date.setMonth(10)
    date.setDate(14)
    date.setFullYear(2008)
    unixTimeSum += date.getTime()
    
  }
  let averageTime = new Date(Math.floor(unixTimeSum/jsBody.length))
  
  return averageTime.toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: '2-digit',
});

}


