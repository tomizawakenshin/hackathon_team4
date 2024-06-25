export const useContainerVariants = () => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
});

export const useItemVariants = (width: string) => ({
  hidden: { opacity: 0, width: "0%" },
  visible: { opacity: 1, width },
});
