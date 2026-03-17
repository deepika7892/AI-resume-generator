const Header = ({ resume }) => (
  <div className="text-center border-b pb-6 mb-8">
    <h1 className="text-4xl font-bold text-purple-700">
      {resume.name}
    </h1>

    <div className="mt-3 text-gray-600 space-x-4">
      {resume.email && <span>{resume.email}</span>}
      {resume.phone && <span>| {resume.phone}</span>}
    </div>

    {resume.linkedin && (
      <a
        href={`https://${resume.linkedin}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        LinkedIn Profile
      </a>
    )}
  </div>
);

export default Header;