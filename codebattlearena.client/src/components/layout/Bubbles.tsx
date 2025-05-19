import { useTheme } from "@/contexts/ThemeContext";
export function Bubbles() {
    const { bubblesEnabled } = useTheme();
    return bubblesEnabled && (
        <div className="background-bubbles">
            <div className="bubble float-slow" style={{ width: "8vw", height: "8vw", top: "15%", left: "8%" }}></div>
            <div className="bubble float-fast" style={{ width: "12vw", height: "12vw", top: "55%", left: "75%" }}></div>
            <div className="bubble float-medium" style={{ width: "4vw", height: "4vw", top: "25%", left: "65%" }}></div>
            <div className="bubble float-slow" style={{ width: "6vw", height: "6vw", top: "10%", left: "85%" }}></div>
            <div className="bubble float-medium" style={{ width: "10vw", height: "10vw", top: "35%", left: "45%" }}></div>
            <div className="bubble float-fast" style={{ width: "5vw", height: "5vw", top: "65%", left: "25%" }}></div>
            <div className="bubble float-slow" style={{ width: "9vw", height: "9vw", top: "85%", left: "12%" }}></div>
            <div className="bubble float-medium" style={{ width: "5vw", height: "5vw", top: "45%", left: "15%" }}></div>
            <div className="bubble float-fast" style={{ width: "7vw", height: "7vw", top: "75%", left: "60%" }}></div>
            <div className="bubble float-slow" style={{ width: "4vw", height: "4vw", top: "20%", left: "30%" }}></div>
            <div className="bubble float-medium" style={{ width: "4vw", height: "4vw", top: "60%", left: "90%" }}></div>
            <div className="bubble float-fast" style={{ width: "6vw", height: "6vw", top: "30%", left: "80%" }}></div>
        </div>
    );
}

export default Bubbles;