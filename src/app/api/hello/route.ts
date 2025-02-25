// src/app/hello/route.ts

import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    console.log(request)
  return NextResponse.json({
    hola: 'mundo',
  });
}

export async function POST(request: NextRequest) {
    console.log(request)

  return NextResponse.json({
    hola: 'mundo',
    method: 'POST',
  });
}
