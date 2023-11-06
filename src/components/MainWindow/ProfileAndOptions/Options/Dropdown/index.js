import './style.scss'

export default function Dropdown({imgSrc, text}){
    return (
        <div className='dropdown'>
                <img
                src={imgSrc}
                />
            <select>
                <option value="">{text}</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="hamster">Hamster</option>
                <option value="parrot">Parrot</option>
                <option value="spider">Spider</option>
                <option value="goldfish">Goldfish</option>
            </select>
        </div>

    )
}