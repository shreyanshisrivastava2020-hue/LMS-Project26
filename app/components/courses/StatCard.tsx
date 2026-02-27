type Props = {
  title: string;
  value: string;
  bgColor?: string;
  textColor?: string;
};

export default function StatCard({
  title,
  value,
  bgColor = "bg-gray-100",
  textColor = "text-black",
}: Props) {
  return (
    <div className={`${bgColor} p-6 rounded-xl shadow-sm`}>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className={`text-2xl font-bold mt-2 ${textColor}`}>
        {value}
      </h3>
    </div>
  );
}