import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Neon Hoodie',
    price: 4990,
    image: 'https://cdn.poehali.dev/projects/d324ccbb-f95f-46bf-b3a1-eb4d226c7d67/files/2af65855-5587-4faf-82fa-cbebfc742f57.jpg',
    category: 'Худи'
  },
  {
    id: 2,
    name: 'Urban Jeans',
    price: 5990,
    image: 'https://cdn.poehali.dev/projects/d324ccbb-f95f-46bf-b3a1-eb4d226c7d67/files/dd040683-c118-4b3b-b935-9d1039eb996d.jpg',
    category: 'Джинсы'
  },
  {
    id: 3,
    name: 'Street Sneakers',
    price: 7990,
    image: 'https://cdn.poehali.dev/projects/d324ccbb-f95f-46bf-b3a1-eb4d226c7d67/files/612e8e0f-e1e7-494a-af0a-57677ec97346.jpg',
    category: 'Обувь'
  },
  {
    id: 4,
    name: 'Graffiti Hoodie',
    price: 4990,
    image: 'https://cdn.poehali.dev/projects/d324ccbb-f95f-46bf-b3a1-eb4d226c7d67/files/2af65855-5587-4faf-82fa-cbebfc742f57.jpg',
    category: 'Худи'
  },
  {
    id: 5,
    name: 'Ripped Denim',
    price: 5990,
    image: 'https://cdn.poehali.dev/projects/d324ccbb-f95f-46bf-b3a1-eb4d226c7d67/files/dd040683-c118-4b3b-b935-9d1039eb996d.jpg',
    category: 'Джинсы'
  },
  {
    id: 6,
    name: 'Neon Kicks',
    price: 7990,
    image: 'https://cdn.poehali.dev/projects/d324ccbb-f95f-46bf-b3a1-eb4d226c7d67/files/612e8e0f-e1e7-494a-af0a-57677ec97346.jpg',
    category: 'Обувь'
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', 'Худи', 'Джинсы', 'Обувь'];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = selectedCategory === 'Все'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-lg bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/45357c98-bb00-4078-a8cd-28bcc8cb2290.jpg" 
                alt="Urban Closet" 
                className="w-12 h-12 rounded-full object-cover border-2 border-primary animate-neon-pulse"
              />
              <h1 className="text-2xl font-bold neon-text">URBAN CLOSET</h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {['home', 'catalog', 'delivery'].map(section => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-sm font-medium transition-all hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {section === 'home' ? 'Главная' : section === 'catalog' ? 'Каталог' : 'Доставка'}
                </button>
              ))}
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative neon-border">
                  <Icon name="ShoppingCart" size={20} />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
                        {cart.map(item => (
                          <Card key={item.id} className="p-4">
                            <div className="flex gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, -1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="destructive"
                                    className="h-8 w-8 ml-auto"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Icon name="Trash2" size={14} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold mb-4">
                          <span>Итого:</span>
                          <span className="text-primary">{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="space-y-12">
            <section className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center bg-gradient-to-br from-card to-muted">
              <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl font-bold mb-6 neon-text animate-neon-pulse">
                  URBAN STYLE
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Уличная мода с неоновыми акцентами. Будь ярче города.
                </p>
                <Button
                  size="lg"
                  onClick={() => setActiveSection('catalog')}
                  className="bg-primary hover:bg-primary/90 text-lg px-8 neon-border"
                >
                  Смотреть каталог
                </Button>
              </div>
            </section>

            <section>
              <h3 className="text-3xl font-bold mb-6 text-center">Хиты продаж</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.slice(0, 3).map(product => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <Badge className="mb-2">{product.category}</Badge>
                      <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">{product.price} ₽</span>
                        <Button onClick={() => addToCart(product)} size="sm">
                          <Icon name="Plus" size={16} className="mr-1" />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center neon-text">Каталог</h2>
            
            <div className="flex gap-2 justify-center flex-wrap">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? 'neon-border' : ''}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <Badge className="mb-2">{product.category}</Badge>
                    <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">{product.price} ₽</span>
                      <Button onClick={() => addToCart(product)} size="sm">
                        <Icon name="Plus" size={16} className="mr-1" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'delivery' && (
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-center neon-text">Доставка и оплата</h2>

            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/20">
                  <Icon name="Truck" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Доставка по России</h3>
                  <p className="text-muted-foreground">
                    Доставка курьером по Москве — 300 ₽ (бесплатно от 5000 ₽)
                  </p>
                  <p className="text-muted-foreground">
                    Доставка по России почтой — от 400 ₽
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-full bg-secondary/20">
                  <Icon name="CreditCard" size={24} className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Способы оплаты</h3>
                  <p className="text-muted-foreground">
                    Банковские карты (Visa, MasterCard, МИР)
                  </p>
                  <p className="text-muted-foreground">
                    Оплата при получении (только для Москвы)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-accent/20">
                  <Icon name="Shield" size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Гарантии</h3>
                  <p className="text-muted-foreground">
                    Возврат в течение 14 дней
                  </p>
                  <p className="text-muted-foreground">
                    100% оригинальная продукция
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
              <h3 className="text-xl font-bold mb-4 text-center">Нужна помощь?</h3>
              <p className="text-center text-muted-foreground mb-4">
                Свяжитесь с нами через ВКонтакте или по телефону
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" className="gap-2">
                  <Icon name="MessageCircle" size={20} />
                  ВКонтакте
                </Button>
                <Button variant="outline" className="gap-2">
                  <Icon name="Phone" size={20} />
                  +7 (999) 123-45-67
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/45357c98-bb00-4078-a8cd-28bcc8cb2290.jpg" 
                alt="Urban Closet" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-bold">URBAN CLOSET</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Urban Closet. Уличная мода для смелых.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="MessageCircle" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
