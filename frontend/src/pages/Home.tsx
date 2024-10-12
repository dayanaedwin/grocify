import { Link } from 'react-router-dom';
import deliveryImg from '../utils/images/delivery.png';
import { features, IAppFeature, RouteConstants } from '../constants';
import { Carousel } from '../components';

export const Home = () => {
    return (
        <div className=''>
            <section className='bg-gray-100 flex flex-col md:flex-row justify-between items-center py-12 px-8 md:px-12 lg:px-32'>
                <div className='flex-1 mt-2'>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold text-[#4f4e4e] pt-4 pb-8 pe-5 leading-tight'>
                        Grocify your life with fresh, quality groceries delivered to your doorstep.
                    </h1>
                    <Link to={RouteConstants.products}>
                        <button className="px-4 py-2 text-lg md:text-xl font-medium text-secondary bg-[#D1AB94] rounded border focus:outline-none hover:bg-white hover:text-[#D1AB94] hover:border-[#D1AB94] focus:ring-0">
                            Shop Now
                        </button>
                    </Link>
                </div>
                <div className='flex-1 mt-8 md:mt-0 justify-between align-center'>
                    {/* Image by <a href="https://www.freepik.com/free-vector/safe-food-delivery_8644518.htm#query=grocery&position=46&from_view=keyword&track=sph&uuid=85de44f7-31e7-403f-8f66-8c86374ac757">Freepik</a> */}
                    <img
                        src={deliveryImg}
                        alt="Image courtsey - Freepik"
                        className='w-3/4 md:w-full max-w-sm lg:max-w-md'
                    />
                </div>
            </section>
            <section className='flex flex-col justify-around align-center py-12 px-8 md:px-12 lg:px-32' >
                <h1 className="text-xl md:text-2xl font-semibold text-[#4F4E4E] mb-8 text-center md:text-left">Our Features</h1>
                <div className="flex flex-wrap justify-around items-center gap-8 px-4 md:px-12">
                    {features.map((item: IAppFeature) =>
                    (<div key={item.id} className="flex flex-col justify-center items-center text-center">
                        <div className='rounded-full w-16 h-16 flex justify-center items-center' style={{ backgroundColor: item.color }}>
                            <item.icon size={23} />
                        </div>
                        <h5 className='text-xs xxl:text-sm font-medium py-2' >{item.title}</h5>
                    </div>))}
                </div>
            </section>
            <section className="px-8 md:px-12 lg:px-32 py-10 bg-gray-100">
                <h1 className="text-xl md:text-2xl font-semibold text-[#4F4E4E] mb-6 md:mb-8 text-center md:text-left">Shop by Category</h1>
                <Carousel />
            </section>
        </div>
    )
}