import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const { done } = await request.json()
    if (typeof done !== 'boolean') {
      return NextResponse.json(
        { message: 'Invalid request body' },
        { status: 400 }
      )
    }

    const todo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: { done },
    })

    return NextResponse.json({ todo })
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json(
      { message: 'Failed to update todo' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    await prisma.todo.delete({
      where: { id: parseInt(id) },
    })
    return NextResponse.json({ message: 'Todo deleted successfully' })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { message: 'Failed to delete todo' },
      { status: 500 }
    )
  }
}
