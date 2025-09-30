import Header from "../components/reusables/Header";

function About() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="text-center py-16 bg-blue-600 text-white shadow-lg mt-10">
        <h1 className="text-4xl font-bold mb-4">About CookBookPro</h1>
        <p className="text-lg max-w-2xl mx-auto">
          All You Need To Know About CookBook — where passion meets flavor and
          recipes turn into unforgettable memories.
        </p>
      </section>

      {/* About Story */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="https://goodycs.com/static/assets/images/recipe-bg.png"
            alt="Cooking Inspiration"
            className="rounded-xl shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            CookBookPro started with a simple idea: to bring together food lovers from all over the world 
            and provide them with a place where they can explore, share, and fall in love with recipes again.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you're a beginner who’s just starting out in the kitchen or an experienced chef 
            looking for inspiration, CookBookPro is your trusted companion for turning ingredients 
            into magic on the plate.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-blue-100 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6">
            Our Mission
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Our mission is to empower every home cook with the tools, resources, 
            and confidence to create meals that bring people together. 
            We believe cooking should be easy, joyful, and full of creativity.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-blue-700 mb-2">Easy to Use</h3>
              <p className="text-gray-600">Simple, intuitive recipes and guides anyone can follow.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-blue-700 mb-2">Global Recipes</h3>
              <p className="text-gray-600">Discover dishes from cultures around the world.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-blue-700 mb-2">Community</h3>
              <p className="text-gray-600">Share your creations and connect with other food lovers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 py-12 text-center text-white">
        <h2 className="text-2xl font-semibold mb-4">
          Ready to explore more?
        </h2>
        <p className="mb-6">
          Join CookBookPro today and start your cooking journey with us.
        </p>
        <a
          href="/recipes"
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-50 transition duration-300"
        >
          View Recipes
        </a>
      </section>
    </div>
  );
}

export default About;
