const EmotionIcon = ({ count }) => {
    const icons = [
      { emoji: '😟', color: 'gray' },
      { emoji: '🙂', color: 'black' },
      { emoji: '😊', color: 'gold' },
      { emoji: '😁', color: 'green' },
    ];
  
    return (
      <span style={{ color: icons[count].color, fontSize: '2rem' }}>
        {icons[count].emoji}
      </span>
    );
  };
  
  export default EmotionIcon;