export default function StatCard({
  title,
  value,
  bgColor,
  textColor,
}: {
  title: string;
  value: string;
  bgColor: string;
  textColor: string;
}) {
  return (
    <div className={`${bgColor} p-6 rounded-xl shadow-sm`}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
    </div>
  );
}