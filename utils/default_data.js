import { Categories, Users } from "../models/index.js";
 
let categories = [
	{
		name: "Mobile Development",
		description: "Creating applications for mobile devices.",
	},
	{
		name: "Data Science",
		description:
			"Analyzing and interpreting complex data to aid in decision-making.",
	},
	{
		name: "Machine Learning",
		description:
			"Field of artificial intelligence that uses statistical techniques to give computer systems the ability to learn.",
	},
	{
		name: "Cybersecurity",
		description:
			"Protecting computer systems and networks from theft or damage to their hardware, software, or electronic data.",
	},
	{
		name: "Cloud Computing",
		description:
			"Using a network of remote servers hosted on the Internet to store, manage, and process data.",
	},
	{
		name: "DevOps",
		description:
			"Combines software development and IT operations with the goal of shortening the systems development life cycle.",
	},
	{
		name: "Internet of Things (IoT)",
		description:
			"Interconnected devices that collect and share data for improved efficiency.",
	},
	{
		name: "Augmented Reality",
		description: "Enhances the real world with computer-generated information.",
	},
	{
		name: "Virtual Reality",
		description: "Immerses the user in a fully artificial digital environment.",
	},
	{
		name: "Blockchain",
		description: "Decentralized and distributed digital ledger technology.",
	},
	{
		name: "UI/UX Design",
		description:
			"Enhancing user satisfaction by improving usability and accessibility.",
	},
	{
		name: "Product Management",
		description: "Overseeing the development and marketing of a product.",
	},
	{
		name: "Big Data",
		description:
			"Refers to the large volume of structured and unstructured data that inundates a business on a day-to-day basis.",
	},
	{
		name: "Digital Marketing",
		description:
			"Promoting products or brands using electronic devices or the internet.",
	},
	{
		name: "Artificial Intelligence",
		description: "Simulating human intelligence processes by machines.",
	},
	{
		name: "E-commerce",
		description: "Buying and selling goods and services over the internet.",
	},
	{
		name: "Robotics",
		description: "Design, construction, operation, and use of robots.",
	},
	{
		name: "Game Development",
		description: "Creating video games for various platforms.",
	},
	{
		name: "UI Test Automation",
		description: "Automating user interface tests to improve software quality.",
	},
	{
		name: "AR/VR Development",
		description:
			"Creating applications using augmented reality or virtual reality technologies.",
	},
];

export default async () => {
	await Categories.bulkCreate(categories);
	await Users.create({
		name: "user1",
		user_name: "user1",
		password: "Test@1234", 
	});
};
