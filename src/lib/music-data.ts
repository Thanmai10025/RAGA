// Curated dataset of real, well-known songs. Links are platform SEARCH links
// (never guessed track URLs), so they always resolve to the genuine song.
export type Language = "Telugu" | "Hindi" | "English" | "Tamil" | "Kannada" | "Malayalam";
export type Mood =
  | "Romantic" | "Happy" | "Sad" | "Motivational" | "Relaxing"
  | "Energetic" | "Devotional" | "Party" | "Focus";

export interface Song {
  id: string;
  title: string;
  artist: string;
  composer: string;
  album: string;
  year: number;
  language: Language;
  genre: string;
  moods: Mood[];
  energy: number; // 0-1
}

export const LANGUAGES: Language[] = ["Telugu", "Hindi", "English", "Tamil", "Kannada", "Malayalam"];
export const MOODS: Mood[] = ["Romantic", "Happy", "Sad", "Motivational", "Relaxing", "Energetic", "Devotional", "Party", "Focus"];
export const MOOD_LABEL: Record<Mood, string> = {
  Romantic: "Romantic", Happy: "Happy", Sad: "Sad", Motivational: "Motivational", Relaxing: "Relaxing",
  Energetic: "Energetic", Devotional: "Devotional", Party: "Party", Focus: "Focus & Study",
};

type Row = [string, string, string, string, number, Language, string, Mood[], number];
const rows: Row[] = [
  // Telugu
  ["Samajavaragamana", "Sid Sriram", "S. Thaman", "Ala Vaikunthapurramuloo", 2020, "Telugu", "Film Melody", ["Romantic", "Relaxing", "Focus"], 0.35],
  ["Butta Bomma", "Armaan Malik", "S. Thaman", "Ala Vaikunthapurramuloo", 2020, "Telugu", "Film Pop", ["Happy", "Romantic"], 0.6],
  ["Ramuloo Ramulaa", "Anurag Kulkarni, Mangli", "S. Thaman", "Ala Vaikunthapurramuloo", 2020, "Telugu", "Folk Dance", ["Party", "Energetic"], 0.85],
  ["Kalaavathi", "Sid Sriram", "S. Thaman", "Sarkaru Vaari Paata", 2022, "Telugu", "Film Melody", ["Romantic", "Happy"], 0.5],
  ["Kurchi Madathapetti", "Sahithi Chaganti, Sri Krishna", "S. Thaman", "Guntur Kaaram", 2024, "Telugu", "Mass Dance", ["Party", "Energetic"], 0.9],
  ["Inkem Inkem Inkem Kaavaale", "Sid Sriram", "Gopi Sundar", "Geetha Govindam", 2018, "Telugu", "Film Melody", ["Romantic", "Relaxing"], 0.4],
  ["Srivalli", "Sid Sriram", "Devi Sri Prasad", "Pushpa: The Rise", 2021, "Telugu", "Film Melody", ["Romantic"], 0.45],
  ["Oo Antava", "Indravathi Chauhan", "Devi Sri Prasad", "Pushpa: The Rise", 2021, "Telugu", "Item Dance", ["Party", "Energetic"], 0.85],
  ["Saami Saami", "Mounika Yadav", "Devi Sri Prasad", "Pushpa: The Rise", 2021, "Telugu", "Folk Dance", ["Party", "Happy"], 0.8],
  ["Nee Kannu Neeli Samudram", "Javed Ali", "Devi Sri Prasad", "Uppena", 2021, "Telugu", "Film Melody", ["Romantic", "Relaxing"], 0.4],
  ["Naatu Naatu", "Rahul Sipligunj, Kaala Bhairava", "M. M. Keeravaani", "RRR", 2022, "Telugu", "Folk Dance", ["Energetic", "Party", "Happy"], 0.95],
  ["Saahore Baahubali", "Daler Mehndi", "M. M. Keeravaani", "Baahubali 2: The Conclusion", 2017, "Telugu", "Film Anthem", ["Motivational", "Energetic"], 0.85],
  ["Chuttamalle", "Shilpa Rao", "Anirudh Ravichander", "Devara: Part 1", 2024, "Telugu", "Film Melody", ["Romantic", "Relaxing"], 0.45],
  ["Fear Song", "Anirudh Ravichander", "Anirudh Ravichander", "Devara: Part 1", 2024, "Telugu", "Mass Anthem", ["Energetic", "Motivational"], 0.95],
  ["Maate Vinadhuga", "Sid Sriram", "Jakes Bejoy", "Taxiwaala", 2018, "Telugu", "Film Melody", ["Romantic", "Relaxing", "Focus"], 0.3],
  ["Undiporaadhey", "Sid Sriram", "Radhan", "Hushaaru", 2018, "Telugu", "Film Melody", ["Sad", "Relaxing"], 0.3],
  ["Vachinde", "Madhu Priya, Ramky", "Shakthikanth Karthick", "Fidaa", 2017, "Telugu", "Folk Pop", ["Happy", "Party"], 0.75],
  ["Saranga Dariya", "Mangli", "Pawan Ch", "Love Story", 2021, "Telugu", "Folk", ["Happy", "Party"], 0.7],
  // Hindi
  ["Tum Hi Ho", "Arijit Singh", "Mithoon", "Aashiqui 2", 2013, "Hindi", "Film Ballad", ["Romantic", "Sad"], 0.35],
  ["Channa Mereya", "Arijit Singh", "Pritam", "Ae Dil Hai Mushkil", 2016, "Hindi", "Film Ballad", ["Sad"], 0.35],
  ["Kesariya", "Arijit Singh", "Pritam", "Brahmastra", 2022, "Hindi", "Film Melody", ["Romantic", "Relaxing"], 0.45],
  ["Apna Bana Le", "Arijit Singh", "Sachin-Jigar", "Bhediya", 2022, "Hindi", "Film Melody", ["Romantic"], 0.4],
  ["Raabta", "Arijit Singh", "Pritam", "Agent Vinod", 2012, "Hindi", "Film Melody", ["Romantic", "Relaxing"], 0.45],
  ["Phir Le Aya Dil", "Arijit Singh", "Pritam", "Barfi!", 2012, "Hindi", "Film Ballad", ["Sad", "Relaxing", "Focus"], 0.25],
  ["Ilahi", "Arijit Singh", "Pritam", "Yeh Jawaani Hai Deewani", 2013, "Hindi", "Film Pop", ["Happy", "Motivational"], 0.65],
  ["Agar Tum Saath Ho", "Alka Yagnik, Arijit Singh", "A. R. Rahman", "Tamasha", 2015, "Hindi", "Film Ballad", ["Sad", "Romantic"], 0.3],
  ["Kun Faya Kun", "A. R. Rahman, Javed Ali, Mohit Chauhan", "A. R. Rahman", "Rockstar", 2011, "Hindi", "Sufi", ["Devotional", "Relaxing", "Focus"], 0.3],
  ["Jai Ho", "Sukhwinder Singh, A. R. Rahman", "A. R. Rahman", "Slumdog Millionaire", 2008, "Hindi", "Film Anthem", ["Energetic", "Motivational", "Party"], 0.85],
  ["Maa Tujhe Salaam", "A. R. Rahman", "A. R. Rahman", "Vande Mataram", 1997, "Hindi", "Patriotic", ["Motivational"], 0.7],
  ["Kal Ho Naa Ho", "Sonu Nigam", "Shankar-Ehsaan-Loy", "Kal Ho Naa Ho", 2003, "Hindi", "Film Ballad", ["Sad", "Relaxing"], 0.3],
  ["Abhi Mujh Mein Kahin", "Sonu Nigam", "Ajay-Atul", "Agneepath", 2012, "Hindi", "Film Ballad", ["Sad"], 0.3],
  ["Suraj Hua Maddham", "Sonu Nigam, Alka Yagnik", "Sandesh Shandilya", "Kabhi Khushi Kabhie Gham", 2001, "Hindi", "Film Melody", ["Romantic"], 0.4],
  ["Sunn Raha Hai (Female)", "Shreya Ghoshal", "Ankit Tiwari", "Aashiqui 2", 2013, "Hindi", "Film Ballad", ["Sad", "Romantic"], 0.3],
  ["Teri Ore", "Shreya Ghoshal, Rahat Fateh Ali Khan", "Pritam", "Singh Is Kinng", 2008, "Hindi", "Film Melody", ["Romantic"], 0.4],
  ["Deewani Mastani", "Shreya Ghoshal", "Sanjay Leela Bhansali", "Bajirao Mastani", 2015, "Hindi", "Classical Film", ["Romantic"], 0.5],
  ["Ghoomar", "Shreya Ghoshal, Swaroop Khan", "Sanjay Leela Bhansali", "Padmaavat", 2018, "Hindi", "Folk", ["Happy", "Party"], 0.6],
  ["Badtameez Dil", "Benny Dayal, Shefali Alvares", "Pritam", "Yeh Jawaani Hai Deewani", 2013, "Hindi", "Dance Pop", ["Party", "Energetic", "Happy"], 0.9],
  ["London Thumakda", "Labh Janjua, Sonu Kakkar, Neha Kakkar", "Amit Trivedi", "Queen", 2014, "Hindi", "Wedding Dance", ["Party", "Happy"], 0.85],
  ["Zinda", "Siddharth Mahadevan", "Shankar-Ehsaan-Loy", "Bhaag Milkha Bhaag", 2013, "Hindi", "Rock", ["Motivational", "Energetic"], 0.85],
  ["Chak De India", "Sukhwinder Singh", "Salim-Sulaiman", "Chak De! India", 2007, "Hindi", "Film Anthem", ["Motivational", "Energetic"], 0.85],
  ["Lakshya", "Shankar Mahadevan", "Shankar-Ehsaan-Loy", "Lakshya", 2004, "Hindi", "Film Anthem", ["Motivational"], 0.75],
  ["Kar Har Maidaan Fateh", "Sukhwinder Singh, Shreya Ghoshal", "Vikram Montrose", "Sanju", 2018, "Hindi", "Film Anthem", ["Motivational"], 0.7],
  ["Deva Shree Ganesha", "Ajay Gogavale", "Ajay-Atul", "Agneepath", 2012, "Hindi", "Devotional", ["Devotional", "Energetic"], 0.8],
  ["Iktara", "Kavita Seth, Amitabh Bhattacharya", "Amit Trivedi", "Wake Up Sid", 2009, "Hindi", "Indie Folk", ["Relaxing", "Focus"], 0.25],
  ["Kabira", "Tochi Raina, Rekha Bhardwaj", "Pritam", "Yeh Jawaani Hai Deewani", 2013, "Hindi", "Sufi Folk", ["Relaxing", "Sad", "Focus"], 0.3],
  ["Tum Se Hi", "Mohit Chauhan", "Pritam", "Jab We Met", 2007, "Hindi", "Film Melody", ["Romantic", "Relaxing"], 0.4],
  ["Bol Do Na Zara", "Armaan Malik", "Amaal Mallik", "Azhar", 2016, "Hindi", "Film Melody", ["Romantic"], 0.35],
  // Tamil
  ["Arabic Kuthu", "Anirudh Ravichander, Jonita Gandhi", "Anirudh Ravichander", "Beast", 2022, "Tamil", "Kuthu", ["Party", "Energetic"], 0.9],
  ["Vaathi Coming", "Anirudh Ravichander, Gana Balachandar", "Anirudh Ravichander", "Master", 2021, "Tamil", "Kuthu", ["Party", "Energetic"], 0.9],
  ["Hukum", "Anirudh Ravichander", "Anirudh Ravichander", "Jailer", 2023, "Tamil", "Mass Anthem", ["Energetic", "Motivational"], 0.9],
  ["Why This Kolaveri Di", "Dhanush", "Anirudh Ravichander", "3", 2012, "Tamil", "Folk Pop", ["Happy"], 0.6],
  ["Rowdy Baby", "Dhanush, Dhee", "Yuvan Shankar Raja", "Maari 2", 2018, "Tamil", "Dance Pop", ["Party", "Happy"], 0.85],
  ["Enjoy Enjaami", "Dhee, Arivu", "Santhosh Narayanan", "Enjoy Enjaami (Single)", 2021, "Tamil", "Folk Hip-hop", ["Happy", "Energetic"], 0.75],
  ["Munbe Vaa", "Shreya Ghoshal, Naresh Iyer", "A. R. Rahman", "Sillunu Oru Kaadhal", 2006, "Tamil", "Film Melody", ["Romantic", "Relaxing"], 0.3],
  // Kannada
  ["Belageddu", "Vijay Prakash", "B. Ajaneesh Loknath", "Kirik Party", 2016, "Kannada", "Film Pop", ["Happy"], 0.6],
  ["Varaha Roopam", "Sai Vignesh", "B. Ajaneesh Loknath", "Kantara", 2022, "Kannada", "Devotional", ["Devotional", "Energetic"], 0.7],
  ["Singara Siriye", "Vijay Prakash, Ananya Bhat", "B. Ajaneesh Loknath", "Kantara", 2022, "Kannada", "Folk Melody", ["Romantic", "Happy"], 0.55],
  ["Salaam Rocky Bhai", "Vijay Prakash, Santhosh Venky", "Ravi Basrur", "K.G.F: Chapter 1", 2018, "Kannada", "Mass Anthem", ["Energetic", "Motivational"], 0.9],
  // Malayalam
  ["Jimikki Kammal", "Vineeth Sreenivasan, Ranjith Unni", "Shaan Rahman", "Velipadinte Pusthakam", 2017, "Malayalam", "Folk Dance", ["Party", "Happy"], 0.8],
  ["Malare", "Vijay Yesudas", "Rajesh Murugesan", "Premam", 2015, "Malayalam", "Film Melody", ["Romantic", "Relaxing", "Focus"], 0.3],
  ["Darshana", "Hesham Abdul Wahab, Darshana Rajendran", "Hesham Abdul Wahab", "Hridayam", 2022, "Malayalam", "Film Melody", ["Romantic", "Happy"], 0.5],
  // English
  ["Shape of You", "Ed Sheeran", "Ed Sheeran", "÷ (Divide)", 2017, "English", "Pop", ["Party", "Happy", "Energetic"], 0.75],
  ["Perfect", "Ed Sheeran", "Ed Sheeran", "÷ (Divide)", 2017, "English", "Pop Ballad", ["Romantic", "Relaxing"], 0.35],
  ["Photograph", "Ed Sheeran", "Ed Sheeran", "x (Multiply)", 2014, "English", "Pop Ballad", ["Sad", "Romantic"], 0.35],
  ["Thinking Out Loud", "Ed Sheeran", "Ed Sheeran", "x (Multiply)", 2014, "English", "Soul Pop", ["Romantic"], 0.4],
  ["Blinding Lights", "The Weeknd", "The Weeknd", "After Hours", 2020, "English", "Synth-pop", ["Energetic", "Party"], 0.85],
  ["Save Your Tears", "The Weeknd", "The Weeknd", "After Hours", 2020, "English", "Synth-pop", ["Sad", "Happy"], 0.65],
  ["Starboy", "The Weeknd, Daft Punk", "The Weeknd", "Starboy", 2016, "English", "R&B", ["Party", "Energetic"], 0.7],
  ["Love Story", "Taylor Swift", "Taylor Swift", "Fearless", 2008, "English", "Country Pop", ["Romantic", "Happy"], 0.65],
  ["Shake It Off", "Taylor Swift", "Taylor Swift", "1989", 2014, "English", "Pop", ["Happy", "Party", "Energetic"], 0.8],
  ["Blank Space", "Taylor Swift", "Taylor Swift", "1989", 2014, "English", "Pop", ["Happy"], 0.65],
  ["Anti-Hero", "Taylor Swift", "Taylor Swift", "Midnights", 2022, "English", "Synth-pop", ["Sad", "Relaxing"], 0.5],
  ["Yellow", "Coldplay", "Coldplay", "Parachutes", 2000, "English", "Alt Rock", ["Romantic", "Relaxing", "Focus"], 0.45],
  ["Fix You", "Coldplay", "Coldplay", "X&Y", 2005, "English", "Alt Rock", ["Sad", "Motivational"], 0.4],
  ["Viva La Vida", "Coldplay", "Coldplay", "Viva la Vida or Death and All His Friends", 2008, "English", "Alt Rock", ["Motivational", "Energetic"], 0.7],
  ["A Sky Full of Stars", "Coldplay", "Coldplay", "Ghost Stories", 2014, "English", "Pop Rock", ["Happy", "Energetic", "Party"], 0.8],
  ["The Scientist", "Coldplay", "Coldplay", "A Rush of Blood to the Head", 2002, "English", "Alt Rock", ["Sad", "Relaxing", "Focus"], 0.3],
  ["Paradise", "Coldplay", "Coldplay", "Mylo Xyloto", 2011, "English", "Alt Rock", ["Relaxing", "Focus"], 0.5],
];

export const SONGS: Song[] = rows.map(([title, artist, composer, album, year, language, genre, moods, energy], i) => ({
  id: `s${i}`, title, artist, composer, album, year, language, genre, moods, energy,
}));

export const ARTISTS: string[] = Array.from(
  new Set(SONGS.flatMap((s) => [...s.artist.split(", "), s.composer])),
).sort();

export const spotifyLink = (s: Song) =>
  `https://open.spotify.com/search/${encodeURIComponent(`${s.title} ${s.artist.split(",")[0]}`)}`;
export const ytMusicLink = (s: Song) =>
  `https://music.youtube.com/search?q=${encodeURIComponent(`${s.title} ${s.artist.split(",")[0]} ${s.album}`)}`;
