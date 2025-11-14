const Footer = ({ children }: { children: React.ReactNode }) => {
    return (
        <footer className="flex justify-center items-center text-center border-t border-gray-800 bg-background-secondary dark:bg-background-secondary-dark mt-32 p-4">
            {children}
        </footer>
    )
}

export default Footer