/**
 * @page HomePage
 * @summary Main landing page for Sweetify
 * @domain public
 * @type landing-page
 * @category public
 */
export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Bem-vindo ao Sweetify</h1>
          <p className="text-xl text-gray-600 mb-8">
            Docinhos artesanais deliciosos para todas as ocasiões
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
              Ver Catálogo
            </button>
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors">
              Saiba Mais
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
