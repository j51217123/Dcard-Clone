const HotSortIcon = (props) => {
  const { isMenuItemClick } = props;
  return (
    <svg
      viewBox='0 0 24 24'
      focusable='false'
      role='img'
      fill={isMenuItemClick === "最新" ? "rgb(51, 151, 207)" : " rgba(0, 0, 0, 0.35)"}>
      <path
        d='M12.9 2.98l2.33 5.07 5.54.64a1 1 0 01.56 1.73l-4.1 3.78 1.1 5.46a1 1 0 01-1.47 1.07L12 18l-4.86 2.73a1 1 0 01-1.47-1.07l1.1-5.46-4.1-3.78a1 1 0 01.56-1.73l5.54-.64 2.32-5.07a1 1 0 011.82 0z'
        data-name='ic_star'></path>
    </svg>
  );
};

export default HotSortIcon;
