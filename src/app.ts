
import express from 'express'
import cors from 'cors'
import fastify from 'fastify'
import { awardsRoutes } from './routes/awards'

export const app = fastify()

app.register(awardsRoutes)

