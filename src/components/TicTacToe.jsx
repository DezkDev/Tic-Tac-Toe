import React, { useState, useEffect } from 'react';
import Announcement from './Announcement'

function TicTacToe() {
    const [loadedData, setLoadedData] = useState(false);
    const [username1, setUsername1] = useState("Player 1");
    const [username2, setUsername2] = useState("Player 2");
    const [weaponUsername1, setWeaponUsername1] = useState("");
    const [currentPlayer, setCurrentPlayer] = useState("");
    const [board, setBoard] = useState(Array(9).fill(null));
    const [announcement, setAnnouncement] = useState("Choose Your Weapon");
    const [isDraw, setIsDraw] = useState(false);


    useEffect(() => {
        if (currentPlayer === username1) {
            setAnnouncement(`${username1}'s turn`);
        } else if (currentPlayer === username2) {
            setAnnouncement(`${username2}'s turn`);
        }
    }, [currentPlayer, username1, username2]);

    const handleReset = () => {
        setLoadedData(false);
        setUsername1("Player 1");
        setUsername2("Player 2");
        setWeaponUsername1("");
        setCurrentPlayer("");
        setBoard(Array(9).fill(null));
        setAnnouncement("Choose Your Weapon");
        setIsDraw(false);
    };

    const handleUsername1Change = (event) => {
        setUsername1(event.target.value);
    }

    const handleUsername2Change = (event) => {
        setUsername2(event.target.value);
    }

    const handleWeaponSelect = (selectedWeapon) => {
        setWeaponUsername1(selectedWeapon);
        setAnnouncement(`${username1}'s turn`);
        setLoadedData(true);
        setCurrentPlayer(username1);
    }

    const handleSquareClick = (index) => {
        if (board[index] || calculateWinner(board) || isDraw) {
            return;
        }

        const newBoard = [...board];
        newBoard[index] = weaponUsername1;
        setWeaponUsername1(weaponUsername1 === "X" ? "O" : "X");
        setBoard(newBoard);

        const winner = calculateWinner(newBoard);
        if (winner) {
            const winningPlayer = winner === "X" ? username1 : username2;
            setAnnouncement(`The winner is ${winningPlayer}`);
        } else {
            if (newBoard.every((square) => square !== null)) {
                setAnnouncement("It's a draw");
                setIsDraw(true);
            } else {
                setCurrentPlayer(currentPlayer === username1 ? username2 : username1);
            }
        }
    };

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    };

    if (!loadedData) {
        return (
            <>
                <div id="title">TIC TAC TOE</div>
                <Announcement anuncio={announcement} />
                <div id="containerIntro">
                    <div id="containerUsername">
                        <input
                            type="text"
                            name="username1"
                            id="username1"
                            placeholder="Player 1 username"
                            onChange={handleUsername1Change}
                        />
                        <input
                            type="text"
                            name="username2"
                            id="username2"
                            placeholder="Player 2 username"
                            onChange={handleUsername2Change}
                        />
                    </div>
                    <div id="containerWeapon">
                        <div
                            id="x"
                            className="weapon"
                            onClick={() => handleWeaponSelect("X")}
                        >
                            X
                        </div>
                        <div
                            id="o"
                            className="weapon"
                            onClick={() => handleWeaponSelect("O")}
                        >
                            O
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div id="title">TIC TAC TOE</div>
                <Announcement anuncio={announcement} />
                <div id="containerGame">
                    <div id="containerSquares">
                        {board.map((value, index) => (
                            <div key={index} className="square" onClick={() => handleSquareClick(index)}>
                                {value}
                            </div>
                        ))}
                    </div>
                    <br></br>
                    <div id='button' onClick={handleReset}>Start again</div>
                </div>
            </>
        );
    }
}

export default TicTacToe;