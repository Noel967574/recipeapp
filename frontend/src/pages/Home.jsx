import Header from "../components/reusables/Header";

function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-16 gap-10 mt-20">

        {/* Text Content */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 leading-tight">
            Welcome to <span className="text-blue-500">CookBookPro</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-lg">
            The ultimate end to your search for delicious recipes 😍.
            Discover mouthwatering dishes, explore creative cooking ideas, and
            master the art of flavor — all in one place.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300">
              Explore Recipes
            </button>
            <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300">
              Join Now
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            alt="Delicious food"
            className="rounded-2xl shadow-2xl w-full md:w-3/4 object-cover"
          />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="px-6 md:px-16 lg:px-24 py-12 bg-white">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { title: "Breakfast", color: "bg-blue-100", img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0" },
            { title: "Lunch", color: "bg-blue-200", img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" },
            { title: "Dinner", color: "bg-blue-300", img: "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Fish-Tacos-1337495.jpg?quality=90&resize=708,643" },
            { title: "Desserts", color: "bg-blue-400", img: "https://thekitchencommunity.org/wp-content/uploads/2021/10/choc-shutterstock_394680466.jpg" }
          ].map((cat, i) => (
            <div
              key={i}
              className={`${cat.color} rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer`}
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-800">{cat.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 md:px-16 lg:px-24 py-16 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Why CookBookPro?</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We bring together food lovers from all over the world. Whether
            you're a professional chef or just getting started, our curated
            recipes, step-by-step instructions, and vibrant community make
            cooking an exciting adventure.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-6 text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} CookBookPro. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
