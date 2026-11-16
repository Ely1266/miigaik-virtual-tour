#!/usr/bin/env python3
"""
Скрипт для создания тестовых эквидистантных панорам 2:1 для Спринта 1.
Генерирует 3 панорамы с сеткой координат (pitch/yaw), маркерами сторон света и названиями локаций.
"""

import os
from PIL import Image, ImageDraw, ImageFont

PANORAMAS = [
    {
        "filename": "gk_1_entry.jpg",
        "title": "Главный вход (Проходная) — 1 этаж",
        "bg_color": (30, 45, 65),
        "grid_color": (50, 75, 105),
        "accent_color": (70, 130, 180)
    },
    {
        "filename": "gk_1_hall.jpg",
        "title": "Центральный холл («Зеркала») — 1 этаж",
        "bg_color": (40, 50, 40),
        "grid_color": (60, 80, 60),
        "accent_color": (100, 160, 100)
    },
    {
        "filename": "gk_2_pink_hall.jpg",
        "title": "Розовый зал (Покои Демидовых) — 2 этаж",
        "bg_color": (70, 40, 50),
        "grid_color": (100, 60, 75),
        "accent_color": (210, 120, 145)
    }
]

def create_panorama(pinfo: dict, out_dir: str, width: int = 2048, height: int = 1024) -> None:
    img = Image.new("RGB", (width, height), color=pinfo["bg_color"])
    draw = ImageDraw.Draw(img)

    # Рисуем градиент потолок/пол
    for y in range(height):
        ratio = abs(y - height // 2) / (height // 2)
        dim = int(30 * ratio)
        c = tuple(max(0, val - dim) for val in pinfo["bg_color"])
        draw.line([(0, y), (width, y)], fill=c)

    # Сетка меридианов (Yaw от -180 до +180)
    for yaw in range(-180, 181, 30):
        x = int((yaw + 180) / 360.0 * width)
        line_col = (255, 255, 255, 80) if yaw % 90 == 0 else pinfo["grid_color"]
        draw.line([(x, 0), (x, height)], fill=line_col, width=2 if yaw % 90 == 0 else 1)
        draw.text((x + 6, height // 2 + 10), f"{yaw}°", fill=(200, 200, 200))

    # Сетка параллелей (Pitch от -90 до +90)
    for pitch in range(-60, 61, 30):
        y = int((90 - pitch) / 180.0 * height)
        draw.line([(0, y), (width, y)], fill=pinfo["grid_color"], width=1)
        draw.text((10, y + 4), f"pitch {pitch}°", fill=(180, 180, 180))

    # Линия горизонта (pitch = 0)
    draw.line([(0, height // 2), (width, height // 2)], fill=(255, 255, 255), width=2)

    # Маркеры сторон света (N=0°, E=90°, S=180°, W=270°/-90°)
    cardinals = [
        (0, "СЕВЕР (N, 0°)"),
        (90, "ВОСТОК (E, 90°)"),
        (180, "ЮГ (S, 180°)"),
        (-90, "ЗАПАД (W, -90°)")
    ]
    for yaw_val, label in cardinals:
        cx = int((yaw_val + 180) / 360.0 * width)
        cy = height // 2 - 60
        draw.rectangle([cx - 90, cy - 16, cx + 90, cy + 16], fill=(0, 0, 0), outline=pinfo["accent_color"], width=2)
        draw.text((cx - 75, cy - 8), label, fill=(255, 255, 255))

    # Центральная табличка с названием зала (при yaw = 0, pitch = 15)
    cx = int(180 / 360.0 * width)
    cy = int((90 - 15) / 180.0 * height)
    banner_w, banner_h = 700, 90
    draw.rectangle(
        [cx - banner_w // 2, cy - banner_h // 2, cx + banner_w // 2, cy + banner_h // 2],
        fill=(15, 20, 28),
        outline=(255, 255, 255),
        width=3
    )
    draw.text((cx - 300, cy - 30), pinfo["title"], fill=(255, 255, 255))
    draw.text((cx - 300, cy + 5), "Тестовая панорама для отладки хотспотов и переходов тура", fill=(170, 190, 210))

    out_path = os.path.join(out_dir, pinfo["filename"])
    img.save(out_path, format="JPEG", quality=90)
    print(f"Сгенерирована панорама: {out_path} ({width}x{height})")

def main():
    target_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public", "panoramas")
    os.makedirs(target_dir, exist_ok=True)
    for p in PANORAMAS:
        create_panorama(p, target_dir)

if __name__ == "__main__":
    main()
