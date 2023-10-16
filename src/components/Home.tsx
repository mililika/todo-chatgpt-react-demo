import CardComponent from "./CardComponent";

const Home = () => {
    return (
        <div className="flex dark:bg-gray-800 justify-center">
            <div className="mt-10 px-20 grid grid-cols-3 gap-6">
                <CardComponent
                    title={"Here is new Test Card"}
                    description={"Here is some description"}
                />
                <CardComponent
                    title={"Here is new Test Card"}
                    description={"Here is some description"}
                />
                <CardComponent
                    title={"Here is new Test Card"}
                    description={"Here is some description"}
                />
                <CardComponent
                    title={"Here is new Test Card"}
                    description={"Here is some description"}
                />
            </div>
        </div>
    );
};

export default Home;
