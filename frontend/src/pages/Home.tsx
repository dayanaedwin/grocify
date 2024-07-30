import img from '../utils/images/delivery.png';
import { features, IAppFeature, productsCategories } from '../constants';
import { Carousel } from '../components';

export const Home = () => {
    return (
        <div className=''>
            <section className='bg-gray-100 flex justify-between align-center p-12'>
                <div className='flex-1 mt-2'>
                    <h1 className='text-5xl font-semibold text-[#4f4e4e] pt-4 pb-8 pe-5 leading-tight'>Grocify your life with fresh, quality groceries delivered to your doorstep.</h1>
                    <button className="px-4 py-2 text-xl font-medium text-secondary bg-[#D1AB94] rounded border focus:outline-none hover:bg-white hover:text-[#D1AB94] hover:border-[#D1AB94] focus:ring-0">Shop Now</button>
                </div>
                <div className='flex-1 justify-between align-center'>
                    {/* Image by <a href="https://www.freepik.com/free-vector/safe-food-delivery_8644518.htm#query=grocery&position=46&from_view=keyword&track=sph&uuid=85de44f7-31e7-403f-8f66-8c86374ac757">Freepik</a> */}
                    <img src={img} alt="Image courtsey - Freepik" />
                </div>
            </section>
            <section className='flex-column justify-around align-center py-12 px-12' >
                <h1 className="text-2xl font-semibold text-[#4F4E4E] mb-8">Our Features</h1>
                <div className="flex justify-around align-center px-12">
                    {features.map((item: IAppFeature) =>
                    (<div key={item.id} className="flex-column justify-center align-center">
                        <div className={`rounded-full mx-auto w-16 h-16 flex justify-center items-center`} style={{ backgroundColor: item.color }}>
                            <item.icon size={23} />
                        </div>
                        <h5 className='text-xs font-medium py-2' >{item.title}</h5>
                    </div>))}
                </div>
            </section>
            <section className="px-12 py-10 bg-gray-100">
                <h1 className="text-2xl font-semibold text-[#4F4E4E]">Shop by Category</h1>
                <Carousel />
            </section>
        </div>
    )
}