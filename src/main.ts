import r from "raylib";

r.InitWindow(1920, 1080, "THE RPG");

while (!r.WindowShouldClose()) {
  r.BeginDrawing();
  r.ClearBackground(r.RAYWHITE);
  r.DrawText("Hello world!", 120, 200, 20, r.LIGHTGRAY);
  r.EndDrawing();
}

r.CloseWindow();
