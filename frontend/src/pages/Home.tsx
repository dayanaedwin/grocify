import img from '../utils/images/delivery.png';

export const Home = () => {
    return (
        <div className='bg-gray-100 px-10'>
            <section className='flex justify-between align-center py-12'>
                <div className='flex-1 mt-2'>
                    <h1 className='text-5xl font-semibold text-[#4f4e4e] pt-4 pb-8 pe-5 leading-tight'>Grocify your life with fresh, quality groceries delivered to your doorstep.</h1>
                    <button className="px-4 py-2 text-xl font-medium text-secondary bg-[#D1AB94] rounded border focus:outline-none hover:bg-white hover:text-primary hover:border-primary focus:ring-0">Shop Now</button>
                </div>
                <div className='flex-1'>
                    {/* Image by <a href="https://www.freepik.com/free-vector/safe-food-delivery_8644518.htm#query=grocery&position=46&from_view=keyword&track=sph&uuid=85de44f7-31e7-403f-8f66-8c86374ac757">Freepik</a> */}
                    <img src={img} alt="Image courtsey - Freepik" />
                </div>
            </section>
        </div>
    )
}