import { NextRequest, NextResponse } from "next/server";

interface returnedData {
  avgConvoStartTime?: number;
  avgPromptLen?: number;
  avgConvoLen?: number;
  avgConvoTimeLength?: number;
  error?: string;
}

export const POST = async (req: NextRequest) => {
  let testObj: returnedData = {
    avgConvoStartTime: 0,
    avgPromptLen: 0,
    avgConvoLen: 0,
    avgConvoTimeLength: 0,
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






  return NextResponse.json({
    success: true,
    body: JSON.stringify(testObj),
  });
};


function getAvgConvLen(jsBody: any) {

}