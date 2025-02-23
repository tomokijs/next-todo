import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

const connect = async () => {
  try {
    await prisma.$connect()
  } catch (error) {
    console.error('Database connection error:', error)
    throw error
  }
}

export const GET = async () => {
  try {
    await connect()
    const todos = await prisma.todo.findMany({
      orderBy: {
        date: 'desc',
      },
    })
    return NextResponse.json({ todos }, { status: 200 })
  } catch (error) {
    console.error('GET request error:', error)
    return NextResponse.json(
      { message: 'データベースに接続できません' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export const POST = async (request: Request) => {
  try {
    const { title } = await request.json()
    await connect()

    const todo = await prisma.todo.create({
      data: {
        title,
      },
    })

    return NextResponse.json({ todo }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error creating todo' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
