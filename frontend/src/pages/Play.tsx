function Play() {
  return (
    <div background-color="black">
      <div className="icon_div">
        {/* ikon ska ersättas med game_id prop image*/}
        <img src="/public/assets/pacman_gameicon.gif" alt="retro game gif" />
      </div>
      <h1 className="game_title">Game 1</h1>
      {/* KNAPP MÅSTE ERSÄTTAS MED DYNAMISK DATA FRÅN BACKEND */}
      <button className="play_stop_button rounded-2xl bg-blue-700 text-white">
        Play
      </button>
    </div>
  );
}

export default Play;
