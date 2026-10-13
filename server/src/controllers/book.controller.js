import { uploadFile, generateUrl } from "../utils/aws_s3.utils.js"
import { Book } from "../models/testBookImage.model.js"

const createBook = async (req, res) => {
    const { name } = req.body
    const file = req.file
    if (!file) {
        res.status(404).json({
            message: "file is not found"
        })
    }
    const imageUrlRes = await uploadFile(file) // use aws s3 bucket to upload image
    const book = await Book.create({
        name,
        imageUrl: imageUrlRes.imageKey
    })

    if (!book) {
        res.status(400).json({
            message: "Book creation failed",
            status: false
        })
    }
    res.status(201).json({
        message: "Book created successfully",
        status: true
    })
}

const getBooks = async (req, res) => {
    try {

        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const skip = (page - 1) * limit

        const [books, total] = await Promise.all([
            Book.find().select("name imageUrl").skip(skip).limit(limit).lean(),
            Book.countDocuments()
        ])

        const booksWithUrls = await Promise.all(
            books.map(async (book) => ({
                ...book,
                imageUrl: await generateUrl(book.imageUrl)
            }))
        );

        res.status(200).json({
            message: "success",
            data: {
                books: booksWithUrls,
                total,
                page,
                totlaPage: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch books"
        });
    }

}

export {
    createBook,
    getBooks
}