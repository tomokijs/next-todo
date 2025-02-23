import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const connect = async () => {
  try {
    await prisma.$connect()
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
