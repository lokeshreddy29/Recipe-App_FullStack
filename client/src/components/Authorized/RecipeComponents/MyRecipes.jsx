import useRecipe from "../../../Hooks/useRecipe"

const MyRecipes = () => {
  const { data } = useRecipe()
  const length = data?.length
  console.log(length)
  return (
    <div className="mt-30 text-black">
      {data?.length === 0 ? (<div className="text-4xl">You have no recipes</div>) : (data?.map((item, i) => (<div key={i}>{item.recipeName}</div>)))}
    </div>
  )
}

export default MyRecipes
