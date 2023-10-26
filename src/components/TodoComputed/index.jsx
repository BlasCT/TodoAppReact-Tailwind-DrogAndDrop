export default function TodoComputed({ computedItemsLeft, clearCompleted }) {
  return (
    <section className="py-4 px-4 flex justify-between bg-white rounded-b-lg dark:bg-gray-800 transition-all duration-700">
      <span className="text-gray-400">{computedItemsLeft} Items Left</span>
      <button className="text-gray-400" onClick={()=>clearCompleted()}>
       Clear Completed
      </button>
    </section>
  );
}
