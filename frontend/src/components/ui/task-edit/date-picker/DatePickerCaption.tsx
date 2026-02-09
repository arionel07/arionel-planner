import dayjs from 'dayjs'

const seasonEmoji: Record<string, string> = {
	winter: '❄️',
	spring: '🌸',
	summer: '☀️',
	autumn: '🍂'
} 

const getSeason = (month: Date): keyof typeof seasonEmoji => {
	const monthNumber = month.getMonth() + 1

	if (monthNumber > 2 && monthNumber < 6) return 'spring'
	if (monthNumber > 5 && monthNumber < 9) return 'summer'
	if (monthNumber > 8 && monthNumber < 12) return 'autumn'
	else return 'winter'
}

export const formatCaption = (month: Date): string =>  {
	const season = getSeason(month)
	const emoji = seasonEmoji[season]
	const monthName = dayjs(month).format('MMMM')

	return `${emoji} ${monthName}`
}
