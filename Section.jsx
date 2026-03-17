const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-2xl font-semibold text-gray-800 mb-5 border-l-4 border-purple-600 pl-3">
      {title}
    </h2>
    {children}
  </section>
);

export default Section;