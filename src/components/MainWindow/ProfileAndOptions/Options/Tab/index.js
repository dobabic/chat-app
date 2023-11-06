import './style.scss';

export default function Tab({imgSrc, name}) {
    return (
        <div className='tab'>
            <img
            src={imgSrc}
            />
            <p>{name}</p>
        </div>
    )
}