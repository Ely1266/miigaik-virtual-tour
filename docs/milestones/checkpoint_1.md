# Отчёт по Контрольной точке №1 (КТ-1)
**Тема:** Проектирование веб-приложения «Виртуальная экскурсия по МИИГАиК»  
**Студент:** Двуреченский Максим Вячеславович (ФГИИБ-ПИ-1б)  
**Формат выполнения:** Индивидуальный проект  
**Репозиторий:** [github.com/Ely1266/miigaik-virtual-tour](https://github.com/Ely1266/miigaik-virtual-tour)

---

## 1. Статус выполнения этапов проектирования

| Письмо / Этап | Запланированные результаты | Фактический статус | Ссылки на артефакты |
|---|---|:---:|---|
| **Письмо 1 (06.10.2026)** | Публичный репозиторий, документация, доска задач, аудит аналога `kartfak.ru` | **Выполнено** | [README.md](../../README.md), [.gitignore](../../.gitignore), [analysis_existing_tour.md](../analysis_existing_tour.md), GitHub Issues #1–#8 |
| **Письмо 2 (20.10.2026)** | Ролевая модель, анализ Кано, план 4 спринтов, диаграмма Use Case, Product Backlog (19 историй) | **Выполнено** | [requirements.md](../requirements.md), [plan.md](../sprints/plan.md), [use_case.png](../uml/use_case.png), [backlog.md](../backlog.md) |
| **Письмо 3 (27.10.2026)** | Архитектура компонентов, модель данных, sequence-диаграмма, activity-диаграмма, JSON-схема, структура папок, аудит лицензий | **Выполнено** | [components.png](../uml/components.png), [classes.png](../uml/classes.png), [sequence_hotspot.png](../uml/sequence_hotspot.png), [activity_panorama.png](../uml/activity_panorama.png), [scenes.schema.json](../data/scenes.schema.json), [scenes.json](../../public/data/scenes.json), [licenses.md](../licenses.md) |

---

## 2. Итоги архитектурного этапа
1. Сформирована структура проекта: клиентское SPA на TypeScript/Vite без тяжелых бэкенд-зависимостей, работающее со статическими данными `scenes.json`.
2. Подготовлены все проектные UML-модели, согласованы роли и требования к качеству панорам (мультиразрешение).
3. Проект полностью готов к переходу на этап непосредственной разработки (**Спринт 1: сборка каркаса плеера, маршрут и съемка первых панорам**).
