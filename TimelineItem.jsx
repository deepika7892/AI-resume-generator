const TimelineItem = ({ title, subtitle, description }) => (
  <div className="mb-6">
    <h3 className="font-semibold text-lg text-gray-800">
      {title}
    </h3>
    {subtitle && (
      <p className="text-sm text-gray-500 mb-1">
        {subtitle}
      </p>
    )}
    {description && (
      <p className="text-gray-700">
        {description}
      </p>
    )}
  </div>
);

export default TimelineItem;