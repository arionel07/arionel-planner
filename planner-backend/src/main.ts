import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')
	app.use(cookieParser())
	app.enableCors({
		origin: ['http://localhost:3000'],
		credentials: true,
		exposedHeaders: 'set-cookie'
	})

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true, // Автоматически преобразует типы (string -> number)
			whitelist: true // Удаляет поля, которых нет в DTO
		})
	)

	await app.listen(process.env.PORT ?? 4200)
}
bootstrap()
