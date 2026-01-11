import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define form schema inside component to access t() function

export default function UIDemo() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("buttons");

  const formSchema = z.object({
    name: z.string().min(2, {
      message: t('forms.validation.nameMinLength') || 'Name must be at least 2 characters',
    }),
    email: z.string().email({
      message: t('forms.validation.validEmail') || 'Please enter a valid email',
    }),
    message: z.string().min(10, {
      message: t('forms.validation.messageMinLength') || 'Message must be at least 10 characters',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {t('finalFixes.uiDemo.enhancedUIComponentsDemo')}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t('finalFixes.uiDemo.showcaseNewlyIntegrated')}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="buttons">{t('uiDemo.buttons')}</TabsTrigger>
          <TabsTrigger value="forms">{t('uiDemo.forms')}</TabsTrigger>
          <TabsTrigger value="cards">{t('uiDemo.cards')}</TabsTrigger>
          <TabsTrigger value="accordion">{t('finalFixes.uiDemo.enhancedAccordion')}</TabsTrigger>
          <TabsTrigger value="images">{t('common.images')}</TabsTrigger>
        </TabsList>

        <TabsContent value="buttons" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('finalFixes.uiDemo.buttonVariants')}</CardTitle>
              <CardDescription>
                {t('finalFixes.uiDemo.variousButtonStyles')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="default">{t('common.default') || 'Default'}</Button>
                <Button variant="secondary">{t('common.secondary') || 'Secondary'}</Button>
                <Button variant="outline">{t('common.outline') || 'Outline'}</Button>
                <Button variant="ghost">{t('common.ghost') || 'Ghost'}</Button>
                <Button variant="link">{t('common.link') || 'Link'}</Button>
                <Button variant="destructive">{t('common.destructive') || 'Destructive'}</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="sm">{t('common.small') || 'Small'}</Button>
                <Button size="default">{t('common.default') || 'Default'}</Button>
                <Button size="lg">{t('common.large') || 'Large'}</Button>
                <Button size="icon">🚗</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('finalFixes.uiDemo.enhancedFormComponents')}</CardTitle>
              <CardDescription>
                {t('finalFixes.uiDemo.formComponentsWithValidation')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('common.name')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('finalFixes.uiDemo.namePlaceholder')} {...field} />
                        </FormControl>
                        <FormDescription>
                          {t('finalFixes.uiDemo.thisIsPublicDisplayName')}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('common.email')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('finalFixes.uiDemo.emailPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-2">
                    <Label>{t('finalFixes.uiDemo.selectOption')}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t('finalFixes.uiDemo.optionPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">{t('common.option')} 1</SelectItem>
                        <SelectItem value="option2">{t('common.option')} 2</SelectItem>
                        <SelectItem value="option3">{t('common.option')} 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('common.message')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t('forms.placeholders.enterMessage')}
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">{t('finalFixes.uiDemo.submitForm')}</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('finalFixes.uiDemo.cardTitle')}</CardTitle>
                <CardDescription>
                  {t('finalFixes.uiDemo.cardDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{t('finalFixes.uiDemo.cardContentExample')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t('finalFixes.uiDemo.anotherCard')}</CardTitle>
                <CardDescription>
                  {t('finalFixes.uiDemo.cardsNowResponsive')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">{t('finalFixes.uiDemo.cardAction')}</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t('finalFixes.uiDemo.enhancedFeatures')}</CardTitle>
                <CardDescription>
                  {t('finalFixes.uiDemo.improvedAccessibility')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>{t('finalFixes.uiDemo.feature1')}</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t('finalFixes.uiDemo.feature2')}</span>
                    <span className="text-green-600">✓</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accordion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('finalFixes.uiDemo.enhancedAccordion')}</CardTitle>
              <CardDescription>
                {t('finalFixes.uiDemo.accordionWithAnimations')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>{t('finalFixes.uiDemo.whatAreNewFeatures')}</AccordionTrigger>
                  <AccordionContent>
                    {t('finalFixes.uiDemo.newFeaturesAnswer')}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>{t('finalFixes.uiDemo.howDoFormsWork')}</AccordionTrigger>
                  <AccordionContent>
                    {t('finalFixes.uiDemo.formsWorkAnswer')}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>{t('finalFixes.uiDemo.whatAboutImages')}</AccordionTrigger>
                  <AccordionContent>
                    {t('finalFixes.uiDemo.imagesAnswer')}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('finalFixes.uiDemo.imageWithFallback')}</CardTitle>
              <CardDescription>
                {t('finalFixes.uiDemo.demonstratesAutoFallback')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">{t('finalFixes.uiDemo.workingImage')}</h4>
                  <ImageWithFallback
                    src="/placeholder.svg"
                    alt="Working image"
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('finalFixes.uiDemo.brokenImageFallback')}</h4>
                  <ImageWithFallback
                    src="/non-existent-image.jpg"
                    alt="Broken image"
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
