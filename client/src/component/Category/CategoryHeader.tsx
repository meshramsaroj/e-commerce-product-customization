

const CategoryHeader = () => {
	return (
		<thead>
			{/* head */}

			<tr>
				<th>
					<label>
						<input type="checkbox" className="checkbox" />
					</label>
				</th>
				<th>Name</th>
				<th>Description</th>
				<th>Actions</th>
			</tr>
		</thead>
	);
};

export default CategoryHeader;