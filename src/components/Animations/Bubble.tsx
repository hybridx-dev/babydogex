export const BubbleAnimation = () => {
    return ( 
        <div className="wrapper">
            {Array(15).fill({}).map((v, i) => (
                <div key={`dot_bubble_${i}`}><span className="dot"></span></div>
            ))}
        </div>
     );
}