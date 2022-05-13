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
        name: "True Adventure/Crime"
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
    },
    {
        title: "Before We Were Yours",
        author: "Lisa Wingate",
    },
    {
        title: "White Fragility: Why It's So Hard for White People to Talk About Racism",
        author: "Robin DiAngelo",
    },
    {
        title: "Educated",
        author: "Tara Westover",
    },
    {
        title: "The Nightingale",
        author: "Kristin Hannah",
    },
    {
        title: "The Giver of Stars",
        author: "Jojo Moyes",
    },
    {
        title: "The Silent Patient",
        author: "Alex Michaelides",
    },
    {
        title: "Talking to Strangers",
        author: "Malcolm Gladwell",
    },
    {
        title: "Conviction",
        author: "Denise Mina",
    },
    {
        title: "The Secrets We Kept",
        author: "Lara Prescott",
    },
    {
        title: "Bad Blood",
        author: "John Carryrou",
    },
    {
        title: "The Tattooist of Auschwitz",
        author: "Heather Morris",
    },
    {
        title: "Everyday Millionaires",
        author: "Chris Hogan",
    },
    {
        title: "How Google Works",
        author: "Eric Schmidt",
    },
    {
        title: "The Little Book of Common Sense Investing",
        author: "John C Bogle",
    },
    {
        title: "Born a Crime",
        author: "Trevor Noah",
    },
    {
        title: "I Will Teach You To Be Rich",
        author: "Ramit Sethi",
    },
    {
        title: "Sapiens",
        author: "Yuval Noah Harari",
    },
    {
        title: "How to Win Friends and Influence People",
        author: "Dale Carnegie",
    },
    {
        title: "Greenlights",
        author: "Matthew McConaughey",
    },
    {
        title: "101 Manatee Jokes!",
        author: "Joe Rehfuss",
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
        const dBgenres = await Genre.bulkCreate(genres);
        await Book.bulkCreate(books);
        await Blog.bulkCreate(blogs);
        await Comment.bulkCreate(comments);
        await dBgenres[1].addBooks([4, 7, 9, 10]);
        await dBgenres[3].addBooks([7, 9]);
        await dBgenres[7].addBooks([2, 5, 6, 10, 12]);
        await dBgenres[8].addBooks([4, 16, 20]);
        await dBgenres[9].addBooks([16]);
        await dBgenres[11].addBooks([1, 3, 8, 19]);
        await dBgenres[13].addBooks([1, 11, 13, 14, 15, 17]);
        await dBgenres[14].addBooks([11]);
        await dBgenres[15].addBooks([1, 3, 8, 18, 19]);
        await dBgenres[16].addBooks([13, 15, 17]);
        await dBgenres[17].addBooks([11, 14, 18]);
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

feedMe()