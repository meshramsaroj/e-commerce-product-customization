
const Rating = ({ id, rating }: { id: string, rating: number }) => {

    return (
        <div className="rating">
            {Array.from({ length: 5 }).map((_, index: number) => {
                return <input type="radio" name={`${id}-rating-2`} className="mask mask-star-2 bg-orange-400 cursor-auto w-4" aria-label="1 star"
                    defaultChecked={index + 1 === rating} disabled={true} />
            }
            )}

        </div>
    )
}

export default Rating