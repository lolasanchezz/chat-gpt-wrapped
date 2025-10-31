import { NextRequest, NextResponse } from "next/server";

 interface returnedData {
    avgConvoStartTime?: number;
    avgPromptLen?: number;
    avgConvoLen?: number;
    avgConvoTimeLength?: number;
    error?: string
  }

export const POST = async (req: NextRequest) => {

    let testObj: returnedData = {
    avgConvoStartTime: 0,
    avgPromptLen: 0,
    avgConvoLen: 0,
    avgConvoTimeLength: 0,
    error: ""
  }

  return NextResponse.json({
    success: true,
    body: JSON.stringify(testObj)
  });
}