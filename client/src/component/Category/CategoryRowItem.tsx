

const CategoryRowItem = ({ category }: { category: any }) => {
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                src={category.image}
                alt="Avatar Tailwind CSS Component"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{category.name}</div>
            <div className="text-sm opacity-50">{category.slug}</div>
          </div>
        </div>
      </td>
      <td className="truncate-text">
        {category.description}

      </td>
      <th>
        <button className="btn btn-ghost btn-xs">Edit</button>
        <button className="btn btn-ghost btn-xs">Delete</button>

      </th>
    </tr>
  );
};

export default CategoryRowItem;