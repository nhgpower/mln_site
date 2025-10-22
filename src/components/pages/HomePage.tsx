import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { DanhmcKinthc, KinthcvGitrThngd } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calculator, TrendingUp, Users } from 'lucide-react';

export default function HomePage() {
  const [categories, setCategories] = useState<DanhmcKinthc[]>([]);
  const [articles, setArticles] = useState<KinthcvGitrThngd[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, articlesData] = await Promise.all([
          BaseCrudService.getAll<DanhmcKinthc>('danhmckinthc'),
          BaseCrudService.getAll<KinthcvGitrThngd>('kinthcvgitrthngd')
        ]);
        
        setCategories(categoriesData.items.filter(cat => cat.isActive).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
        setArticles(articlesData.items.sort((a, b) => new Date(b.publishDate || 0).getTime() - new Date(a.publishDate || 0).getTime()));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary-foreground">Đang tải nội dung...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Inspired by the split-screen layout */}
      <section className="w-full max-w-[120rem] mx-auto min-h-screen flex flex-col lg:flex-row">
        {/* Left side - Image */}
        <div className="lg:w-3/5 relative overflow-hidden">
          <Image
            src="https://static.wixstatic.com/media/516dbc_1e3c0820d1a74106b308cbc3b27a7e8c~mv2.png?originWidth=768&originHeight=576"
            alt="Biểu đồ kinh tế thị trường hiện đại"
            className="w-full h-full object-cover"
            width={800}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20"></div>
        </div>

        {/* Right side - Content block with dark background */}
        <div className="lg:w-2/5 bg-primary text-primary-foreground flex items-center">
          <div className="p-8 lg:p-12 xl:p-16">
            <div className="mb-6">
              <Badge variant="outline" className="border-primary-foreground text-primary-foreground mb-4">
                Kinh Tế Học
              </Badge>
            </div>
            
            <h1 className="font-heading text-4xl lg:text-5xl xl:text-6xl mb-6 leading-tight">
              Giá Trị Thặng Dư Trong Nền Kinh Tế Thị Trường
            </h1>
            
            <p className="font-paragraph text-lg lg:text-xl mb-8 opacity-90 leading-relaxed">
              Khám phá những khái niệm cốt lõi về giá trị thặng dư, cách thức hoạt động trong hệ thống kinh tế thị trường và tác động đến sự phát triển xã hội.
            </p>
            
            <p className="font-paragraph text-base lg:text-lg mb-10 opacity-80 leading-relaxed">
              Nội dung được tổ chức theo từng chủ đề cụ thể, giúp bạn hiểu sâu về cơ chế tạo ra và phân phối giá trị trong nền kinh tế hiện đại.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <BookOpen className="mr-2 h-5 w-5" />
                Khám Phá Nội Dung
              </Button>
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Link to="/quiz">
                  <Calculator className="mr-2 h-5 w-5" />
                  Làm Bài Quiz
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Light background inspired by bottom section */}
      <section className="w-full bg-secondary py-16 lg:py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl text-secondary-foreground mb-6">
              Chủ Đề Kiến Thức
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Nội dung được phân chia theo các chủ đề chính, giúp bạn tiếp cận kiến thức một cách có hệ thống và toàn diện.
            </p>
          </div>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Card key={category._id} className="bg-background border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Chủ đề {category.displayOrder || 1}
                      </Badge>
                    </div>
                    <CardTitle className="font-heading text-xl text-secondary-foreground">
                      {category.categoryName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-paragraph text-secondary-foreground/70 leading-relaxed">
                      {category.categoryDescription}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-secondary-foreground/40 mx-auto mb-4" />
              <p className="font-paragraph text-secondary-foreground/60">
                Nội dung đang được cập nhật...
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Latest Articles Section */}
      {articles.length > 0 && (
        <section className="w-full py-16 lg:py-24">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl lg:text-4xl text-secondary-foreground mb-6">
                Bài Viết Mới Nhất
              </h2>
              <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-3xl mx-auto leading-relaxed">
                Cập nhật những kiến thức mới nhất về giá trị thặng dư và các khái niệm kinh tế liên quan.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {articles.slice(0, 6).map((article) => (
                <Card key={article._id} className="bg-background border-0 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  {article.mainImage && (
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={article.mainImage}
                        alt={article.title || 'Hình ảnh bài viết'}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        width={400}
                      />
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {article.author || 'Tác giả'}
                      </Badge>
                      {article.publishDate && (
                        <span className="text-xs text-secondary-foreground/60">
                          {new Date(article.publishDate).toLocaleDateString('vi-VN')}
                        </span>
                      )}
                    </div>
                    <CardTitle className="font-heading text-lg text-secondary-foreground line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-paragraph text-secondary-foreground/70 leading-relaxed line-clamp-3">
                      {article.summary}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="w-full bg-primary py-16 lg:py-20">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl text-primary-foreground mb-6">
            Kiểm Tra Kiến Thức Của Bạn
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Hoàn thành bài quiz để đánh giá mức độ hiểu biết của bạn về giá trị thặng dư trong nền kinh tế thị trường.
          </p>
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link to="/quiz">
              <Calculator className="mr-2 h-5 w-5" />
              Bắt Đầu Quiz Ngay
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}