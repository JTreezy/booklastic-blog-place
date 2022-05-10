const sequelize = require("../config/connection")
const {User,Blog,Genre,Comment,Book} = require("../models")

const users = [
    {
        first_name:"brooke",
        email:"brooke@brooke.com",
        password:"password"
    },
    {
        first_name:"andrew",
        email:"andrew@andrew.com",
        password:"password123"
    },
    {
        first_name:"jonathan",
        email:"jonathan@jonathan.com",
        password:"password456"
    },
    {
        first_name:"haley",
        email:"haley@haley.com",
        password:"password789"
    }
]

const genres = [
    {
        name: "Fantasy"
    },
    {
        name: "Literary fiction"
    },
    {
        name: "Science fiction"
    },
    {
        name: "Thriller/Suspense"
    },
    {
        name: "Picture Book"
    },
    {
        name: "Young Adult"
    },
    {
        name: "Romance"
    },
    {
        name: "Historical fiction"
    },
    {
        name: "Memoir"
    },
    {
        name: "Narrative"
    },
    {
        name: "History"
    },
    {
        name: "Self-Help"
    },
    {
        name: "Health/Fitness"
    },
    {
        name: "Business"
    },
    {
        name: "True Adeventure/Crime"
    },
    {
        name: "Psychology"
    },
    {
        name: "Finance"
    },
    {
        name: "Science/Technology"
    }
]

const books = [
    {
        title: "Dare to Lead",
        author: "Brene Brown",
        genreId: 1
    },
    {
        title: "Before We Were Yours",
        author: "Lisa Wingate",
        genreId: 4
    },
    {
        title: "White Fragility: Why It's So Hard for White People to Talk About Racism",
        author: "Robin DiAngelo",
        genreId: 7

    },
    {
        title: "Educated",
        author: "Tara Westover",
        genreId: 1
    },
    {
        title: "The Nightingale",
        author: "Kristin Hannah",
        genreId: 2
    },
    {
        title: "The Giver of Stars",
        author: "Jojo Moyes",
        genreId: 1
    },
    {
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genreId: 3
    },
    {
        title: "Talking to Strangers",
        author: "Malcolm Gladwell",
        genreId: 5
    },
    {
        title: "Conviction",
        author: "Denise Mina",
        genreId: 5
    },
    {
        title: "The Secrets We Kept",
        author: "Lara Prescott",
        genreId: 6
    },
    {
        title: "Bad Blood",
        author: "John Carryrou",
        genreId: 8
    },
    {
        title: "The Tattooist of Auschwitz",
        author: "Heather Morris",
        genreId: 6
    },
    {
        title: "Everyday Millionaires",
        author: "Chris Hogan",
        genreId: 9
    },
    {
        title: "How Google Works",
        author: "Eric Schmidt",
        genreId: 10
    },
    {
        title: "The Little Book of Common Sense Investing",
        author: "John C Bogle",
        genreId: 2
    },
    {
        title: "Born a Crime",
        author: "Trevor Noah",
        genreId: 12
    },
    {
        title: "I Will Teach You To Be Rich",
        author: "Ramit Sethi",
        genreId: 2
    },
    {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        genreId: 13
    },
    {
        title: "How to Win Friends and Influence People",
        author: "Dale Carnegie",
        genreId: 7
    },
    {
        title: "Greenlights",
        author: "Matthew McConaughey",
        genreId: 15
    }
]

const blogs = [
    {
        title:"my fave book",
        review:"I love this book! It is my all time favorite!",
        userId:1,
        bookId:1
    },
    {
        title:"thriller",
        review:"So suspenseful! Definitely recommend",
        userId:2,
        bookId:2
    },
    {
        title:"5/10",
        review:"It was okay but not my favorite",
        userId:3,
        bookId:4
    },
    {
        title:"Educational!",
        review:"Long book but worth the read!",
        userId:2,
        bookId:6
    }
]

const comments = [
    {
        body: "great post!",
        userId: 2,
        blogId: 1
    },
    {
        body: "I agree with you on xxx but disagree about ...",
        userId: 3,
        blogId: 3
    },
    {
        body: "i like this book too!",
        userId: 1,
        blogId: 4
    },
    {
        body: "worst book ever - good review!",
        userId: 1,
        blogId: 3
    }
]

const feedMe = async ()=>{
    try{
        await sequelize.sync({force:true})
        await User.bulkCreate(users,{
            individualHooks:true
        });
        await Genre.bulkCreate(genres);
        await Book.bulkCreate(books);
        await Blog.bulkCreate(blogs);
        await Comment.bulkCreate(comments);
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

feedMe()