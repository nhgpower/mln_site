import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { DanhmcKinthc, KinthcvGitrThngd } from '@/entities';
import { Image } from '@/components/ui/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookOpen, GraduationCap, BarChart3, TrendingUp, Calendar, User, ArrowRight } from 'lucide-react';

export default function KnowledgePage() {
  const [categories, setCategories] = useState<DanhmcKinthc[]>([]);
  const [articles, setArticles] = useState<KinthcvGitrThngd[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, articlesData] = await Promise.all([
          BaseCrudService.getAll<DanhmcKinthc>('danhmckinthc'),
          BaseCrudService.getAll<KinthcvGitrThngd>('kinthcvgitrthngd')
        ]);
        
        const activeCategories = categoriesData.items
          .filter(cat => cat.isActive)
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        
        const sortedArticles = articlesData.items
          .sort((a, b) => new Date(b.publishDate || 0).getTime() - new Date(a.publishDate || 0).getTime());
        
        setCategories(activeCategories);
        setArticles(sortedArticles);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredArticles = selectedCategory 
    ? articles.filter(article => article.title?.toLowerCase().includes(selectedCategory.toLowerCase()))
    : articles;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary-foreground">Đang tải nội dung kiến thức...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="w-full bg-primary text-primary-foreground py-16 lg:py-20">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="border-primary-foreground text-primary-foreground mb-6">
              Kho Tàng Kiến Thức
            </Badge>
            <h1 className="font-heading text-4xl lg:text-5xl xl:text-6xl mb-6 leading-tight">
              Giá Trị Thặng Dư Trong Nền Kinh Tế Thị Trường
            </h1>
            <p className="font-paragraph text-lg lg:text-xl opacity-90 leading-relaxed">
              Khám phá toàn bộ kiến thức về giá trị thặng dư, từ những khái niệm cơ bản đến các ứng dụng thực tiễn trong nền kinh tế thị trường hiện đại.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="w-full bg-secondary py-12">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl lg:text-3xl text-secondary-foreground mb-4">
              Danh Mục Kiến Thức
            </h2>
            <p className="font-paragraph text-secondary-foreground/80">
              Chọn chủ đề để khám phá nội dung chi tiết
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-xl font-paragraph transition-all duration-300 ${
                selectedCategory === null
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-background text-secondary-foreground hover:bg-primary/10'
              }`}
            >
              Tất cả chủ đề
            </button>
            {categories.map((category, index) => {
              const icons = [TrendingUp, GraduationCap, BarChart3, BookOpen];
              const IconComponent = icons[index % icons.length];
              
              return (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category.categoryName || '')}
                  className={`px-6 py-3 rounded-xl font-paragraph transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.categoryName
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-background text-secondary-foreground hover:bg-primary/10'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {category.categoryName}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Knowledge Categories Overview */}
      {!selectedCategory && (
        <section className="w-full py-16 lg:py-20">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl lg:text-4xl text-secondary-foreground mb-6">
                Tổng Quan Các Chủ Đề
              </h2>
              <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-3xl mx-auto leading-relaxed">
                Mỗi chủ đề được thiết kế để cung cấp kiến thức toàn diện và có hệ thống về giá trị thặng dư.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((category, index) => {
                const icons = [TrendingUp, GraduationCap, BarChart3, BookOpen];
                const IconComponent = icons[index % icons.length];
                
                return (
                  <Card 
                    key={category._id} 
                    className="bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedCategory(category.categoryName || '')}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            Chủ đề {category.displayOrder || index + 1}
                          </Badge>
                        </div>
                        <ArrowRight className="h-5 w-5 text-secondary-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      <CardTitle className="font-heading text-xl text-secondary-foreground group-hover:text-primary transition-colors duration-300">
                        {category.categoryName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="font-paragraph text-secondary-foreground/70 leading-relaxed">
                        {category.categoryDescription}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Articles/Content Section */}
      <section className="w-full py-16 lg:py-20 bg-secondary/50">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl text-secondary-foreground mb-6">
              {selectedCategory ? `Nội dung: ${selectedCategory}` : 'Toàn Bộ Nội Dung Kiến Thức'}
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              {selectedCategory 
                ? `Khám phá chi tiết về ${selectedCategory.toLowerCase()}`
                : 'Tất cả nội dung kiến thức về giá trị thặng dư được tổ chức và trình bày một cách có hệ thống.'
              }
            </p>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Card key={article._id} className="bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  {article.mainImage && (
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={article.mainImage}
                        alt={article.title || 'Hình ảnh minh họa'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={400}
                      />
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs">
                        <User className="h-3 w-3 mr-1" />
                        {article.author || 'Tác giả'}
                      </Badge>
                      {article.publishDate && (
                        <div className="flex items-center text-xs text-secondary-foreground/60">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(article.publishDate).toLocaleDateString('vi-VN')}
                        </div>
                      )}
                    </div>
                    <CardTitle className="font-heading text-lg text-secondary-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-paragraph text-secondary-foreground/70 leading-relaxed line-clamp-3 mb-4">
                      {article.summary}
                    </CardDescription>
                    {article.content && (
                      <>
                        <Separator className="my-4" />
                        <div className="font-paragraph text-sm text-secondary-foreground/80 leading-relaxed line-clamp-4">
                          {article.content}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-secondary-foreground/40 mx-auto mb-4" />
              <h3 className="font-heading text-xl text-secondary-foreground mb-2">
                {selectedCategory ? 'Chưa có nội dung cho chủ đề này' : 'Chưa có nội dung'}
              </h3>
              <p className="font-paragraph text-secondary-foreground/60">
                {selectedCategory 
                  ? 'Nội dung cho chủ đề này đang được cập nhật.'
                  : 'Nội dung kiến thức đang được cập nhật.'
                }
              </p>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300"
                >
                  Xem tất cả chủ đề
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Knowledge Statistics */}
      <section className="w-full py-16 lg:py-20">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-secondary-foreground mb-2">
                {categories.length}
              </h3>
              <p className="font-paragraph text-secondary-foreground/70">
                Chủ đề kiến thức
              </p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-secondary-foreground mb-2">
                {articles.length}
              </h3>
              <p className="font-paragraph text-secondary-foreground/70">
                Bài viết kiến thức
              </p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-secondary-foreground mb-2">
                100%
              </h3>
              <p className="font-paragraph text-secondary-foreground/70">
                Nội dung chất lượng
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}