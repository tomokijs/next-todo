import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export const connect = async () => {
  try {
    prisma.$connect()
  } catch (error) {
    console.error(error)
    return Error('DB接続失敗しました')
  }
}

export const GET = async () => {
  try {
    await connect()
    const todos = await prisma.todo.findMany()

    return NextResponse.json({ todos }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ messeage: 'Error' }, { status: 500 })
  } finally {
    //必ず実行する
    await prisma.$disconnect()
  }
}
