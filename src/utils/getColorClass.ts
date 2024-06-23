export const getColorClass = (index: number) => {
  const colorClasses = [
    "bg-blue-300",
    "bg-red-300",
    "bg-yellow-300",
    "bg-green-300",
    "bg-purple-300",
  ];
  return colorClasses[index % colorClasses.length];
};
