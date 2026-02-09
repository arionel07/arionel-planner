import { LoaderPinwheel as LoaderIcon } from 'lucide-react'
const Loader = ()=> {
	return <div className='flex items-center justify-center'>
		<LoaderIcon className='animate-spin h-7 w-7 text-white' />
	</div>
}

export default Loader