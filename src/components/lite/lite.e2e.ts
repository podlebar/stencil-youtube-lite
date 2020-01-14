import { newE2EPage } from '@stencil/core/testing';

describe('lite-youtube -> ', () => {
  it('renders the component', async () => {
    const page = await newE2EPage();
    await page.setContent('<lite-youtube data-videoid="MvZ-clcMCec"></lite-youtube>');

    const element = await page.find('lite-youtube');
    expect(element).toHaveClass('hydrated');
  });

  it('renders play button', async () => {
    const page = await newE2EPage();
    await page.setContent('<lite-youtube data-videoid="MvZ-clcMCec"></lite-youtube>');

    const element = await page.find('lite-youtube');
    expect(element.innerHTML).toContain('<div class="lty-playbtn"></div>')
  });

  it('click on play button', async () => {
    const page = await newE2EPage();
    await page.setContent('<lite-youtube data-videoid="MvZ-clcMCec"></lite-youtube>');

    const element = await page.find('lite-youtube');
    const button = await page.find('.lty-playbtn');
    button.click();
    await page.waitForChanges();
    expect(element.innerHTML).toContain('<iframe width="560" height="315" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" src="https://www.youtube.com/embed/MvZ-clcMCec?autoplay=1"></iframe>')
  });

});
