import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
  OverlayTrigger,
  Tooltip,
  Modal,
} from "react-bootstrap";
import TotalPrice from "../components/TotalPrice.jsx";
import { useCart } from "../context/useCart.js";
import { useAuth } from "../context/useAuth.js";

// Product list (10+ items)
const PRODUCTS = [
  {
    id: 1,
    title: "Ray-Ban Sunglasses",
    desc: "Classic wayfarer silhouette with polarized UV400 lenses and everyday-tough frames.",
    price: 999.0,
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Polaroid Film Camera",
    desc: "Instant analog joy—auto flash, simple controls, and prints you can hold in seconds.",
    price: 1999.0,
    img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Premium Headphones",
    desc: "Over-ear noise cancelling with 40 mm drivers, rich detail, and up to 30-hour battery.",
    price: 2499.0,
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Atlas Watch",
    desc: "Stainless fitness watch with OLED display, GPS, heart-rate tracking, and 7-day battery.",
    price: 2699.0,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Artisians Camera Lens",
    desc: "High quality second-hand camera lens. Perfect for photography enthusiasts.",
    price: 1199.0,
    img: "https://images.unsplash.com/photo-1640533493858-f03ed7cb18b8?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Premium French Deodorant",
    desc: "Aluminum-free scent with bergamot and cedar. Clean feel, 24-hour confidence.",
    price: 279.0,
    img: "https://images.unsplash.com/photo-1620917669788-be691b2db72a?w=600&h=400&fit=crop",
  },
  {
    id: 7,
    title: "PUMA Shoes",
    desc: "Lightweight trainers with breathable mesh and a cushioned midsole for all-day comfort.",
    price: 1399.0,
    img: "https://images.unsplash.com/photo-1545289414-1c3cb1c06238?w=600&h=400&fit=crop",
  },
  {
    id: 8,
    title: "JBL Headset",
    desc: "Clear voice boom mic, punchy bass, and memory-foam comfort—perfect for calls or gaming.",
    price: 1499.0,
    img: "https://images.unsplash.com/photo-1579065560489-989b0cc394ce?w=600&h=400&fit=crop",
  },
  {
    id: 9,
    title: "Apple Watch",
    desc: "Always-on display, advanced fitness tracking, crash detection, and Apple Pay on your wrist.",
    price: 4999.0,
    img: "https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd?w=600&h=400&fit=crop",
  },
  {
    id: 10,
    title: "Premium Iris Sunnies",
    desc: "Oversized gradient lenses with anti-glare coating and a lightweight acetate frame.",
    price: 749.0,
    img: "https://images.unsplash.com/photo-1584036553516-bf83210aa16c?w=600&h=400&fit=crop",
  },
];

// Colour options
const COLOURS = ["Black", "White", "Ocean"];

export default function Products() {
  const { addItem } = useCart();
  const { isLoggedIn } = useAuth();

  // Selected colour per product
  const [selected, setSelected] = useState(() =>
    Object.fromEntries(PRODUCTS.map((p) => [p.id, "Choose colour"]))
  );

  const handleColour = (id, colour) =>
    setSelected((prev) => ({ ...prev, [id]: colour }));

  const handleBuy = (product) => addItem(product);

  // ---- Lightbox state ----
  const [viewer, setViewer] = useState({
    open: false,
    index: 0,
    zoom: 1,
  });

  const current = useMemo(
    () => PRODUCTS[viewer.index] ?? PRODUCTS[0],
    [viewer.index]
  );

  const openViewer = (idx) => setViewer({ open: true, index: idx, zoom: 1 });
  const closeViewer = () => setViewer((v) => ({ ...v, open: false }));
  const next = () =>
    setViewer((v) => ({
      open: true,
      index: (v.index + 1) % PRODUCTS.length,
      zoom: 1,
    }));
  const prev = () =>
    setViewer((v) => ({
      open: true,
      index: (v.index - 1 + PRODUCTS.length) % PRODUCTS.length,
      zoom: 1,
    }));
  const setZoom = (z) =>
    setViewer((v) => ({ ...v, zoom: Math.min(4, Math.max(1, z)) }));

  const toggleZoom = () =>
    setViewer((v) => ({
      ...v,
      zoom: v.zoom >= 2 ? 1 : +(v.zoom + 0.5).toFixed(2),
    }));

  const handleWheel = (e) => {
    // zoom with mouse wheel inside the modal
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    setZoom(+(viewer.zoom + delta).toFixed(2));
  };

  // Keyboard controls while open
  useEffect(() => {
    if (!viewer.open) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "+") setZoom(viewer.zoom + 0.2);
      if (e.key === "-") setZoom(viewer.zoom - 0.2);
      if (e.key === "0") setZoom(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewer.open, viewer.zoom]);

  return (
    <>
      {/* Floating total price */}
      <TotalPrice />

      <Container className="py-3">
        <h1 className="glass mb-3">Products</h1>
        <Row xs={1} sm={2} md={3} className="g-4">
          {PRODUCTS.map((p, idx) => {
            const buyBtn = (
              <Button
                variant="primary"
                className="mt-auto"
                onClick={() =>
                  handleBuy({
                    id: p.id,
                    title: p.title,
                    price: p.price,
                    img: p.img,
                    colour:
                      selected[p.id] && selected[p.id] !== "Choose colour"
                        ? selected[p.id]
                        : undefined,
                  })
                }
                disabled={!isLoggedIn}
              >
                Buy
              </Button>
            );

            return (
              <Col key={p.id}>
                <Card className="h-100 shadow-sm bg-dark text-light border-0">
                  <div style={{ position: "relative" }}>
                    <Card.Img
                      variant="top"
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      onClick={() => openViewer(idx)}
                      style={{ cursor: "zoom-in" }}
                      title="Click to zoom"
                    />
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{p.title}</Card.Title>
                    <Card.Text
                      className="text-secondary"
                      style={{ minHeight: 48 }}
                    >
                      {p.desc}
                    </Card.Text>

                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <DropdownButton
                        id={`colour-${p.id}`}
                        title={selected[p.id]}
                        variant="secondary"
                        size="sm"
                      >
                        {COLOURS.map((c) => (
                          <Dropdown.Item
                            key={c}
                            onClick={() => handleColour(p.id, c)}
                          >
                            {c}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>

                      <div className="fw-bold">R {p.price.toFixed(2)}</div>
                    </div>

                    {!isLoggedIn ? (
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tt-${p.id}`}>
                            Log in on Home to buy
                          </Tooltip>
                        }
                      >
                        <span className="d-grid">{buyBtn}</span>
                      </OverlayTrigger>
                    ) : (
                      buyBtn
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* Lightbox / Zoom Modal */}
      <Modal
        show={viewer.open}
        onHide={closeViewer}
        size="xl"
        centered
        contentClassName="bg-dark text-light border-0"
      >
        <Modal.Header closeButton className="border-0">
          <div className="d-flex align-items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={prev}
              aria-label="Previous image"
            >
              ← Prev
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={next}
              aria-label="Next image"
            >
              Next →
            </Button>
            <div className="ms-2 small text-secondary">
              {viewer.index + 1} / {PRODUCTS.length}
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div
            onWheel={handleWheel}
            style={{
              maxHeight: "80vh",
              overflow: "auto",
              display: "grid",
              placeItems: "center",
            }}
          >
            <img
              src={current.img}
              alt={current.title}
              draggable="false"
              onClick={toggleZoom}
              style={{
                maxWidth: "90vw",
                maxHeight: "80vh",
                transform: `scale(${viewer.zoom})`,
                transformOrigin: "center center",
                transition: "transform 0.2s ease-out",
                cursor: viewer.zoom > 1 ? "zoom-out" : "zoom-in",
                userSelect: "none",
                display: "block",
              }}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <div className="small text-secondary">{current.title}</div>
            <div className="d-flex gap-2">
              <Button
                variant="outline-light"
                size="sm"
                onClick={() => setZoom(1)}
              >
                Reset
              </Button>
              <Button
                variant="outline-light"
                size="sm"
                onClick={() => setZoom(viewer.zoom + 0.2)}
              >
                +
              </Button>
              <Button
                variant="outline-light"
                size="sm"
                onClick={() => setZoom(viewer.zoom - 0.2)}
              >
                –
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
